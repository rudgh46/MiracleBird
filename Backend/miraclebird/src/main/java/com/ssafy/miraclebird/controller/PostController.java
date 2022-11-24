package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.securityOauth.config.security.token.CurrentUser;
import com.ssafy.miraclebird.securityOauth.config.security.token.UserPrincipal;
import com.ssafy.miraclebird.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@Api("게시판 관련 REST V1")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @ApiOperation(value = "전체 게시글 정보를 반환한다.", response = List.class)
    @GetMapping
    public ResponseEntity<List<PostDto>> getPostAll() {
        List<PostDto> result = null;

        try {
            result = postService.getPostAll();
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "새로운 게시글을 등록한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody PostDto postDto, @RequestParam(value = "user_idx", required = false) Long userIdx_nouse, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try {
            System.out.println("postcontroller");
            long userIdx = userPrincipal.getId();
            System.out.println("getid");
            postService.createPost(postDto, userIdx);
            System.out.println("야호");
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "post_id에 해당하는 게시글 정보를 반환한다.", response = PostDto.class)
    @GetMapping("/{post_idx}")
    public ResponseEntity<PostDto> getPost(@PathVariable("post_idx") Long postIdx) {
        PostDto result = null;

        try {
            result = postService.getPost(postIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "post_idx에 해당하는 게시글 정보를 수정한다.", response = String.class)
    @PutMapping("/{post_idx}")
    public ResponseEntity<String> updatePost(@PathVariable("post_idx") Long postIdx, @RequestBody PostDto postDto, @RequestParam(value = "user_idx", required = false) Long userIdx_nouse, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try {
            long userIdx = userPrincipal.getId();
            postDto.setPostIdx(postIdx);
            postService.updatePost(postDto, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "post_idx에 해당하는 게시글 정보를 삭제한다.", response = String.class)
    @DeleteMapping("/{post_idx}")
    public ResponseEntity<String> deletePost(@PathVariable("post_idx") Long postIdx, @RequestParam(value = "user_idx", required = false) Long userIdx_nouse, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try {
            long userIdx = userPrincipal.getId();
            postService.deletePost(postIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}