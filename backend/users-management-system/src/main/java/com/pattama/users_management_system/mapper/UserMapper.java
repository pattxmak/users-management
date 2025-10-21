package com.pattama.users_management_system.mapper;

import com.pattama.users_management_system.dto.request.RegisterRequest;
import com.pattama.users_management_system.dto.response.UserResponse;
import com.pattama.users_management_system.entity.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE )
public interface UserMapper {

    User toEntity(RegisterRequest registerRequest);

    UserResponse toUserResponse(User user);

    List<UserResponse> toUserResponseList(List<User> users);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "role", ignore = true)
    void updateEntityFromRequest(RegisterRequest request, @MappingTarget User user);

}
