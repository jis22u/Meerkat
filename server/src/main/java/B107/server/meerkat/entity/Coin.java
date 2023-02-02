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
import java.util.Objects;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "coin")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coin extends BaseAtTime implements Serializable {

    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Integer coin; // 코인 보유량

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Coin coin1 = (Coin) o;
        return member.equals(coin1.member) && coin.equals(coin1.coin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(member, coin);
    }
}
