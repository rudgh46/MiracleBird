package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Landmark_Info")
public class Landmark_Info {

    @Id
    @Column(name = "landmark_info_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long landmarkInfoIdx;

    @Column(nullable = true)
    private String province;

    @Column(nullable = true)
    private String city;

    @Column(nullable = true, name = "dong_code")
    private int dongCode;

    @Column(nullable = true)
    private String title;

    @Column(nullable = true)
    private String content;

    /* 연관관계 매핑 */
    @OneToMany(mappedBy = "landmarkInfo")
    List<Landmark> landmarkList = new ArrayList<>();

}
