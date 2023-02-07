package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BaseAtTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "deposit")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Deposit extends BaseAtTime implements Serializable {

    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 거래당사자 Idx
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member member;

    @Column(name = "reg_date")
    private LocalDateTime regDate; // 거래 일시

    private Integer coin; // 거래 유동량
    private Integer balance; // 잔액

    /*
    1 코인충전
    2 코인환전
    3 거래
     */
    @Column(name = "transaction_code")
    private Integer transactionCode; // 거래코드

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Deposit deposit = (Deposit) o;
        return idx.equals(deposit.idx) && member.equals(deposit.member) && regDate.equals(deposit.regDate) && coin.equals(deposit.coin) && balance.equals(deposit.balance) && transactionCode.equals(deposit.transactionCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idx, member, regDate, coin, balance, transactionCode);
    }
}
