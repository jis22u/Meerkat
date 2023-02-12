package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
	
	// 코인 충전
	
	// 코인 환전
	
	// 거래 완료 - 요청자 
	
	// 거래 완료 - 제공자
}
