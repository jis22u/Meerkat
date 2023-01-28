//package B107.vision.repository;
//
//import B107.vision.entity.Token;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//@Repository
//public interface TokenRepository extends JpaRepository<Token, Long> {
//    Token findByMemberId(String token);
//
//    @Transactional
//    @Modifying(clearAutomatically = true)
//    @Query("UPDATE Token t SET t.refreshToken = :token WHERE t.memberId= :memberId")
//    Integer updateToken(@Param("token") String token, @Param("memberId") String memberId);
//}
