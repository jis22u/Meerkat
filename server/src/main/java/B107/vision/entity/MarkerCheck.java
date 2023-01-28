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
import java.util.Objects;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "marker_check")
@EntityScan
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarkerCheck implements Serializable {

    // 미어캣의 사용자 Idx
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "mc_check")
    private Boolean mcCheck; // 사용자의 마커 등록 가능 여부 체크

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MarkerCheck that = (MarkerCheck) o;
        return member.equals(that.member) && Objects.equals(mcCheck, that.mcCheck);
    }

    @Override
    public int hashCode() {
        return Objects.hash(member, mcCheck);
    }
}
