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
import java.util.Objects;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "call")
@EntityScan
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Call implements Serializable {

    // 시야 요청건의 Idx
    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 요청자 Idx
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String location; // 위치 정보
    private Float lat; // 위도
    private Float lng; // 경도
    private Integer coin; // 주고받은 코인량
    private String content; // 요청사항 String

    @Column(name = "room_id")
    private String roomId; // 대화방 id

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Call call = (Call) o;
        return idx.equals(call.idx) && member.equals(call.member) && location.equals(call.location) && lat.equals(call.lat) && lng.equals(call.lng) && coin.equals(call.coin) && content.equals(call.content) && Objects.equals(roomId, call.roomId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idx, member, location, lat, lng, coin, content, roomId);
    }
}
