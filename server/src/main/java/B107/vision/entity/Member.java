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

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "member")
@EntityScan
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member implements Serializable {

    // 사용자 Idx
    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "member_id")
    private String memberId; // 사용자 ID

    private String pwd; // 사용자 pwd
    private String nickname; // 사용자 nickname
    private String email; // 사용자 email

    @Column(name = "phone_no")
    private String phoneNo; // 사용자 전화번호

    @Column(name = "reg_date")
    private LocalDateTime regDate; // 사용자 가입일

    private Integer warn; // 사용자가 신고받은 횟수
//    @Convert(converter = BooleanToYNConverter.class)
    private Boolean ban; // 사용자 제재 여부
}
