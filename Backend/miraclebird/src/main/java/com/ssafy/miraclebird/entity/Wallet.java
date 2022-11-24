package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.dto.WalletDto;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Wallet")
public class Wallet {
    @Id
    @Column(name = "wallet_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long walletIdx;

    @Column(nullable = true, name = "wallet_address")
    private String walletAddress;

    @Column(nullable = true, name = "mira_token")
    private long miraToken;

    @Column(nullable = true, name = "ether_coin")
    private long etherCoin;

    /* 연관관계 매핑 */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userIdx", unique = true)
    private User user;

    @OneToMany(mappedBy = "wallet")
    List<Mynft> mynft = new ArrayList<>();

    public static Wallet of(WalletDto walletDto) {
        Wallet walletEntity = ModelMapperUtils.getModelMapper().map(walletDto, Wallet.class);

        return walletEntity;
    }

    @Override
    public String toString(){
        return "success wallet_idx : " + walletIdx + ", wallet_address : " + walletAddress + ", mira_token : " + miraToken + ", ether_coin : " + etherCoin + ", userIdx : " + user.getUserIdx();
    }
}
