package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDeposit is a Querydsl query type for Deposit
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDeposit extends EntityPathBase<Deposit> {

    private static final long serialVersionUID = 1221197851L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDeposit deposit = new QDeposit("deposit");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    public final NumberPath<Integer> balance = createNumber("balance", Integer.class);

    public final NumberPath<Integer> coin = createNumber("coin", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final DateTimePath<java.time.LocalDateTime> regDate = createDateTime("regDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> transactionCode = createNumber("transactionCode", Integer.class);

    public QDeposit(String variable) {
        this(Deposit.class, forVariable(variable), INITS);
    }

    public QDeposit(Path<? extends Deposit> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDeposit(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDeposit(PathMetadata metadata, PathInits inits) {
        this(Deposit.class, metadata, inits);
    }

    public QDeposit(Class<? extends Deposit> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

