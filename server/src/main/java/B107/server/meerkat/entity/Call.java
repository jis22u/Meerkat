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

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "call")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Call extends BaseAtTime implements Serializable {

    // 시야 요청건의 Idx
    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 요청자 Idx
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member member;

    private String location; // 위치 정보
    private Float lat; // 위도
    private Float lng; // 경도
    private Integer coin; // 주고받은 코인량
    private String content; // 요청사항 String

    @Column(name = "room_id")
    private String roomId; // 대화방 id

}
