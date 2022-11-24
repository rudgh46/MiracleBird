package com.ssafy.miraclebird.securityOauth.domain.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private long userIdx;

    private String name;

    private String email;

    private String imageUrl;

    private Boolean blacklist;

    private Boolean emailVerified;

    private String password;

    private Provider provider;

    private Role role;

    private String providerId;

    public static UserDto of(User userEntity) {
        UserDto userDto = ModelMapperUtils.getModelMapper().map(userEntity, UserDto.class);

        return userDto;
    }

}
