package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BaseAtTime;
import B107.server.meerkat.config.utils.BooleanToYNConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "report")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report extends BaseAtTime implements Serializable {

    // 신고 건 Idx
    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 접수자 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_idx")
    private Member fromMember;

    // 대상자 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_idx")
    private Member toMember;

    // 거래 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deal_idx")
    private Deal deal;

    private String category;

    @Column(name = "approval_check")
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean approvalCheck;

}
