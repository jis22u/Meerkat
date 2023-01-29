package B107.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "deposit")
@EntityScan
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Deposit implements Serializable {

    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 거래당사자 Idx
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "reg_date")
    private LocalDateTime regDate; // 거래 일시

    private Integer coin; // 거래 유동량
    private Integer balance; // 잔액

    @Column(name = "deal_code")
    private Integer dealCode; // 거래코드

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Deposit deposit = (Deposit) o;
        return idx.equals(deposit.idx) && member.equals(deposit.member) && regDate.equals(deposit.regDate) && coin.equals(deposit.coin) && balance.equals(deposit.balance) && dealCode.equals(deposit.dealCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idx, member, regDate, coin, balance, dealCode);
    }
}
