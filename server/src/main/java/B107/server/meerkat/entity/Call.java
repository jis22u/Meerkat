package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BaseAtTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "call_on")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Call extends BaseAtTime implements Serializable {

    // 시야 요청건의 Idx
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 요청자 Idx
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member member;

    private String location; // 위치 정보
    private Double lat; // 위도
    private Double lng; // 경도
    private Integer coin; // 주고받은 코인량
    private String content; // 요청사항 String

    @Column(name = "room_name")
    private String roomName; // 대화방 id

}
