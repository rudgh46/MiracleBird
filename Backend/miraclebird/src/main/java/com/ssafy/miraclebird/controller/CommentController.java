package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.CommentDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.securityOauth.config.security.token.CurrentUser;
import com.ssafy.miraclebird.securityOauth.config.security.token.UserPrincipal;
import com.ssafy.miraclebird.service.CommentService;
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
@RequestMapping("/comment")
@Api("댓글 관련 REST V1")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @ApiOperation(value = "post_idx에 해당하는 게시글의 전체 댓글 정보를 반환한다", response = List.class)
    @GetMapping("/{post_idx}")
    public ResponseEntity<List<CommentDto>> getCommentAll(@PathVariable("post_idx") Long postIdx) {
        List<CommentDto> result = null;

        try {
            result = commentService.getCommentAll(postIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "새로운 댓글을 등록한다.", response = Comment.class)
    @PostMapping
    public ResponseEntity<String> createComment(@RequestBody CommentDto commentDto,@RequestParam("post_idx") Long postIdx, @RequestParam(value = "user_idx", required = false) Long userIdx_nouse, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try {
            long userIdx = userPrincipal.getId();
            commentService.createComment(commentDto, postIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "comment_idx에 해당하는 댓글 정보를 수정한다.", response = String.class)
    @PutMapping("/{comment_idx}")
    public ResponseEntity<String> updateComment(@PathVariable("comment_idx") Long commentIdx, @RequestBody CommentDto commentDto, @RequestParam(value = "user_idx",required = false) Long userIdx_nouse, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try {
            long userIdx = userPrincipal.getId();
            commentDto.setCommentIdx(commentIdx);
            commentService.updateComment(commentDto, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "comment_idx에 해당하는 댓글 정보를 삭제한다.", response = String.class)
    @DeleteMapping("/{comment_idx}")
    public ResponseEntity<String> deletePost(@PathVariable("comment_idx") Long commentIdx, @RequestParam(value = "user_idx", required = false) Long userIdx_nouse, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try {
            long userIdx = userPrincipal.getId();
            commentService.deleteComment(commentIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}