package B107.server.meerkat.repository;

import B107.server.meerkat.dto.member.MemPageDealDTO;
import B107.server.meerkat.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {

    @Query("SELECT new B107.server.meerkat.dto.member.MemPageDealDTO(c.location, c.coin, d.exitTime) " +
            "FROM Call c, Deal d " +
            "WHERE c.idx = d.call.idx " +
            "AND d.reqMember.idx = :idx " +
            "ORDER BY d.exitTime DESC")
    List<MemPageDealDTO> findAllMyReqHistory(Long idx);

    @Query("SELECT new B107.server.meerkat.dto.member.MemPageDealDTO(c.location, c.coin, d.exitTime) " +
            "FROM Call c, Deal d " +
            "WHERE c.idx = d.call.idx " +
            "AND d.resMember.idx = :idx " +
            "ORDER BY d.exitTime DESC")
    List<MemPageDealDTO> findAllMyResHistory(Long idx);
}
