package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Report;
import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReportDto {
    private long reportIdx;
    private String description;
    private long userIdx;
    private long verificationIdx;

    //유저정보
    private String reporterName;
    private String suspectName;

    public static ReportDto of(Report missionEntity) {
        ReportDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, ReportDto.class);
        return missionDto;
    }
}
