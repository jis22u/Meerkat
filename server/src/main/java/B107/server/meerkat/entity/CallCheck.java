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
@Table(name = "call_check")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CallCheck extends BaseAtTime implements Serializable {

    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "cc_check")
    private Boolean ccCheck; // 요청가능여부

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CallCheck callCheck = (CallCheck) o;
        return member.equals(callCheck.member) && ccCheck.equals(callCheck.ccCheck);
    }

    @Override
    public int hashCode() {
        return Objects.hash(member, ccCheck);
    }
}
