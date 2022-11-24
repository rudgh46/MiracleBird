package com.ssafy.miraclebird.dao;


import com.ssafy.miraclebird.entity.Report;
import com.ssafy.miraclebird.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReportDaoImpl implements ReportDao {
    private final ReportRepository reportRepository;

    @Autowired
    public ReportDaoImpl(ReportRepository reportRepository){
        this.reportRepository = reportRepository;
    }

    @Override
    public List<Report> getReportALL() {
        List<Report> reportEntity = reportRepository.findAll();
        System.out.println("여기이");
        return reportEntity;
    }

    @Override
    public Report getReportById(long reportIdx) {
        Report reportEntity = reportRepository.getById(reportIdx);
        return reportEntity;
    }

    @Override
    public void saveReport(Report report) throws Exception {
        reportRepository.save(report);
    }

    @Override
    public void deleteReport(long reportIdx) throws Exception {
        try {
            reportRepository.deleteById(reportIdx);
        }
        catch (Exception e){
            throw new Exception();
        }
    }
}
