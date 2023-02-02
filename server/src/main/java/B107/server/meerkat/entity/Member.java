package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BaseAtTime;
import B107.server.meerkat.config.utils.BooleanToYNConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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

    @NotNull
    @Column(name = "member_id")
    private String memberId; // 사용자 ID

    @NotNull
    private String password; // 사용자 pwd

    @NotNull
    private String name; // 사용자 name

    @NotNull
    private String email; // 사용자 email

    @NotNull
    private String tel; // 사용자 전화번호

    @ColumnDefault("0")
    private Integer warn; // 사용자가 신고받은 횟수

    @Convert(converter = BooleanToYNConverter.class)
    private Boolean ban; // 사용자 제재 여부

    @ColumnDefault("'ROLE_MEMBER'")
    private String role;

    @Column(name = "fcm_token")
    private String fcmToken; // fcm 알림을 받을 token

    @Override
    public void prePersist() {
        super.prePersist();
        this.warn = 0;
        this.role = "ROLE_MEMBER";
        this.ban = false;
        this.fcmToken = "";
    }
}
