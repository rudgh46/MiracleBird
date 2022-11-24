package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.entity.Price;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.Role;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PriceDto {

    private long priceIdx;

    private LocalDateTime sellDate;

    private int sellPrice;

    private String userFrom;

    private String userTo;

    private String hash;

    private String gasPrice;

    private long landmarkIdx;

    public static PriceDto of(Price priceEntity) {
        PriceDto priceDto = ModelMapperUtils.getModelMapper().map(priceEntity, PriceDto.class);

        return priceDto;
    }

}
