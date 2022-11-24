package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Mynft;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.Role;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MynftDto {

    private long mynftIdx;
    private long walletIdx;
    private long landmarkIdx;
    //Landmark
//    private String hash;
//    private long starForce;
//    private Boolean selling;
//    private long sellPrice;
//    private long tokenId;
//    private String jsonPath;
//    private String imagePath;
    //Landmark_info


    public static MynftDto of(Mynft mynftEntity) {
        MynftDto mynftDto = ModelMapperUtils.getModelMapper().map(mynftEntity, MynftDto.class);

        return mynftDto;
    }

}
