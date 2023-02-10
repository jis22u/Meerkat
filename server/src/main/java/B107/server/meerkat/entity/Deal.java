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
@Table(name = "deal")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Deal extends BaseAtTime implements Serializable {

    // 거래 table Idx
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "response_idx")
    private Member resMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_idx")
    private Member reqMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "call_idx")
    private Call call;

    @Column(name = "init_time")
    private LocalDateTime initTime;

    @Column(name = "exit_time")
    private LocalDateTime exitTime;

    private Boolean reported;
    private Boolean permit;

}
