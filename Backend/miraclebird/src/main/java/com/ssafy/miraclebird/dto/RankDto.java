package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class RankDto {
    private String name;
    private String image;

    public static RankDto of(Verification missionEntity) {
        RankDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, RankDto.class);
        return missionDto;
    }
}
