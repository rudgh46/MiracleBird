package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.securityOauth.config.security.token.CurrentUser;
import com.ssafy.miraclebird.securityOauth.config.security.token.UserPrincipal;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.UserDto;
import com.ssafy.miraclebird.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Api("유저 관련 REST V1")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "user_idx에 해당하는 유저 정보를 반환한다.", response = UserDto.class)
    @GetMapping("/{user_idx}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("user_idx") Long userIdx) {

        UserDto result = null;

        try {
            result = userService.getUserById(userIdx);
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "user_idx에 해당하는 유저 정보를 수정한다.", response = UserDto.class)
    @PutMapping("/{user_idx}")
    public ResponseEntity<UserDto> updateUserInfo(@PathVariable("user_idx") Long userIdx_nouse, @RequestParam(value = "name",required = false) String name, @RequestParam(value = "image_url",required = false) String imageUrl, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        UserDto result = null;

        try {
            if(imageUrl == "") System.out.println("공백");
            if(imageUrl == null) System.out.println("널");
            long userIdx = userPrincipal.getId();
            result = userService.updateUserInfo(userIdx, name, imageUrl);
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "user_idx에 해당하는 유저 정보를 삭제한다.", response = String.class)
    @DeleteMapping("/{user_idx}")
    public ResponseEntity<String> deleteUser(@PathVariable("user_idx") Long userIdx_nouse, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try {
            long userIdx = userPrincipal.getId();
            userService.deleteUser(userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "user_idx에 해당하는 유저를 블랙리스트로 지정한다.", response = String.class)
    @PutMapping("/blacklist")
    public ResponseEntity<String> updateUserBlacklist(@RequestParam("user_idx") Long blacklist, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try {
            long userIdx = userPrincipal.getId();
            userService.updateUserBlacklist(userIdx, blacklist);
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}