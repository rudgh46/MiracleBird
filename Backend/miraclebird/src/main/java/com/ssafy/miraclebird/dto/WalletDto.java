package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.entity.Wallet;
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
public class WalletDto {

    private long walletIdx;

    private String walletAddress;

    private long miraToken;

    private long etherCoin;

    private long userIdx;

    public static WalletDto of(Wallet walletEntity) {
        WalletDto walletDto = ModelMapperUtils.getModelMapper().map(walletEntity, WalletDto.class);

        return walletDto;
    }

}
