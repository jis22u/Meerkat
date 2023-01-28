package B107.vision.entity;

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
@Table(name = "deal")
@EntityScan
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Deal implements Serializable {

    // 거래 table Idx
    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "response_id")
    private Member resMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id")
    private Member reqMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "call_id")
    private Call call;

    @Column(name = "init_time")
    private LocalDateTime initTime;

    @Column(name = "exit_time")
    private LocalDateTime exitTime;

    private Boolean reported;
    private Boolean permit;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Deal deal = (Deal) o;
        return idx.equals(deal.idx) && resMember.equals(deal.resMember) && reqMember.equals(deal.reqMember) && call.equals(deal.call) && Objects.equals(initTime, deal.initTime) && Objects.equals(exitTime, deal.exitTime) && Objects.equals(reported, deal.reported) && Objects.equals(permit, deal.permit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idx, resMember, reqMember, call, initTime, exitTime, reported, permit);
    }
}
