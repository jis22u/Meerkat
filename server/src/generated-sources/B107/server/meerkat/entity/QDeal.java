package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDeal is a Querydsl query type for Deal
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDeal extends EntityPathBase<Deal> {

    private static final long serialVersionUID = 1248840719L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDeal deal = new QDeal("deal");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    public final QCall call;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final DateTimePath<java.time.LocalDateTime> exitTime = createDateTime("exitTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final DateTimePath<java.time.LocalDateTime> initTime = createDateTime("initTime", java.time.LocalDateTime.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final BooleanPath permit = createBoolean("permit");

    public final BooleanPath reported = createBoolean("reported");

    public final QMember reqMember;

    public final QMember resMember;

    public QDeal(String variable) {
        this(Deal.class, forVariable(variable), INITS);
    }

    public QDeal(Path<? extends Deal> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDeal(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDeal(PathMetadata metadata, PathInits inits) {
        this(Deal.class, metadata, inits);
    }

    public QDeal(Class<? extends Deal> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.call = inits.isInitialized("call") ? new QCall(forProperty("call"), inits.get("call")) : null;
        this.reqMember = inits.isInitialized("reqMember") ? new QMember(forProperty("reqMember")) : null;
        this.resMember = inits.isInitialized("resMember") ? new QMember(forProperty("resMember")) : null;
    }

}

