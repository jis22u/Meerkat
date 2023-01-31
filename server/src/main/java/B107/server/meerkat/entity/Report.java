package B107.server.meerkat.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "report")
@EntityScan
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report implements Serializable {

    // 신고 건 Idx
    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 접수자 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_id")
    private Member fromMember;

    // 대상자 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_id")
    private Member toMember;

    // 거래 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deal_id")
    private Deal deal;

    private String category;

    @Column(name = "approval_check")
    private Boolean approvalCheck;
}
