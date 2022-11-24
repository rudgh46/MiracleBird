package com.ssafy.miraclebird.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Price")
public class Price {
    @Id
    @Column(name = "price_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long priceIdx;

    @Column(nullable = true, name = "sell_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime sellDate;

    @Column(nullable = true, name = "sell_price")
    private int sellPrice;

    @Column(nullable = true, name = "user_from")
    private String userFrom;

    @Column(nullable = true, name = "user_to")
    private String userTo;

    @Column(nullable = true)
    private String hash;

    @Column(nullable = true, name = "gas_price")
    private String gasPrice;

    /* 연관관계 매핑 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landmarkIdx")
    private Landmark landmark;

    @OneToOne(mappedBy = "price")
    private Transaction transaction;


}
