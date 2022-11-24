package com.ssafy.miraclebird.repository;


import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report,Long> {
}
