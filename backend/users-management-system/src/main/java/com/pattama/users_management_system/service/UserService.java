package com.pattama.users_management_system.service;

import com.pattama.users_management_system.dto.request.LoginRequest;
import com.pattama.users_management_system.dto.request.RefreshTokenRequest;
import com.pattama.users_management_system.dto.request.RegisterRequest;
import com.pattama.users_management_system.dto.response.LoginResponse;
import com.pattama.users_management_system.dto.response.RefreshTokenResponse;
import com.pattama.users_management_system.dto.response.UserResponse;
import com.pattama.users_management_system.entity.User;
import com.pattama.users_management_system.exception.UserException;
import com.pattama.users_management_system.mapper.UserMapper;
import com.pattama.users_management_system.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public UserService(UserMapper userMapper, UserRepository userRepository, PasswordEncoder passwordEncoder, JWTUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public UserResponse register(RegisterRequest regRequest) {

        if (regRequest.getEmail() == null || regRequest.getEmail().isBlank()) {
            throw UserException.emailNull();
        }

        if (regRequest.getPassword() == null || regRequest.getPassword().isBlank()) {
            throw UserException.passwordNull();
        }

        if (userRepository.existsByEmail(regRequest.getEmail())) {
            throw UserException.emailDuplicated();
        }

        User user = userMapper.toEntity(regRequest);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User userSaved = userRepository.save(user);

        return userMapper.toUserResponse(userSaved);

    }

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            // Spring Security จะตรวจสอบอีเมลและรหัสผ่าน
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            // กรณีรหัสผ่านผิด
            throw UserException.loginFailPasswordIncorrect();
        } catch (UsernameNotFoundException e) {
            // กรณีอีเมลไม่พบ (ถ้า UserDetailsService โยนตัวนี้)
            throw UserException.loginFailEmailNotFound();
        }

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(UserException::userNotFound);

        String jwt = jwtUtils.generateToken(user);
        String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

        return new LoginResponse(200, jwt, refreshToken, "1Hr", "User has been logged in successfully");
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {

        String email = jwtUtils.extractUsername(refreshTokenRequest.getToken());

        User user = userRepository.findByEmail(email)
                .orElseThrow(UserException::userNotFound);

        if (!jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user)) {
            throw UserException.tokenInvalid();
        }

        String newToken = jwtUtils.generateToken(user);

        return new RefreshTokenResponse(
                newToken,
                refreshTokenRequest.getToken(),
                "1Hr",
                "Successfully refreshed token"
        );
    }

    public List<UserResponse> getAllUsers() {

        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw UserException.userNotFound();
        }
        return userMapper.toUserResponseList(users);
    }

    public UserResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(UserException::userNotFound);

        return userMapper.toUserResponse(user);
    }

    public UserResponse getMyInfo(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(UserException::userNotFound);

        return userMapper.toUserResponse(user);
    }

    public UserResponse updateUser(Long userId, RegisterRequest updateRequest) {

        User existingUser = userRepository.findById(userId)
                .orElseThrow(UserException::userNotFound);

        // using mapstruct
        userMapper.updateEntityFromRequest(updateRequest, existingUser);

//        case not using mapping in mapper
//        if (updateRequest.getName() != null && !updateRequest.getName().isBlank()) {
//            existingUser.setName(updateRequest.getName());
//        }
//
//        if (updateRequest.getCity() != null && !updateRequest.getCity().isBlank()) {
//            existingUser.setCity(updateRequest.getCity());
//        }
//
//        if (updateRequest.getPassword() != null && !updateRequest.getPassword().isBlank()) {
//            existingUser.setPassword(passwordEncoder.encode(updateRequest.getPassword()));
//        }

        User updatedUser = userRepository.save(existingUser);
        return userMapper.toUserResponse(updatedUser);
    }

    public void deleteUser(Long userId) {

        User existingUser = userRepository.findById(userId)
                .orElseThrow(UserException::userNotFound);

        userRepository.delete(existingUser);
    }


}
