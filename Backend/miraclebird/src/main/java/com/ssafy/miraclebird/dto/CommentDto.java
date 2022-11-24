package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.Role;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommentDto {

    private long commentIdx;

    private LocalDateTime regtime;

    private String content;

    private long userIdx;

    private long postIdx;

    private String name;

    private String image_url;

    public static CommentDto of(Comment commentEntity) {
        CommentDto commentDto = ModelMapperUtils.getModelMapper().map(commentEntity, CommentDto.class);

        return commentDto;
    }

}
