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
@Table(name = "member")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseAtTime implements Serializable {

    // 사용자 Idx
    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "member_id")
    private String memberId; // 사용자 ID

    private String password; // 사용자 pwd
    private String name; // 사용자 name
    private String email; // 사용자 email
    private String tel; // 사용자 전화번호
    private Integer warn; // 사용자가 신고받은 횟수
//    @Convert(converter = BooleanToYNConverter.class)
    private Boolean ban; // 사용자 제재 여부
    private String role;

    @Column(name = "fcm_token")
    private String fcmToken; // fcm 알림을 받을 token
}
