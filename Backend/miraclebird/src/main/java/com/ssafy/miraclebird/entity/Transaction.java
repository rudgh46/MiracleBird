package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Transaction")
public class Transaction {
    @Id
    @Column(name = "transaction_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long transactionIdx;

    @Column(nullable = true, name = "sale_price")
    private int salePrice;

    @Column(nullable = true)
    private LocalDateTime regtime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_idx")
    private Price price;

}
