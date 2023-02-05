package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMarkerCheck is a Querydsl query type for MarkerCheck
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMarkerCheck extends EntityPathBase<MarkerCheck> {

    private static final long serialVersionUID = -244197397L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMarkerCheck markerCheck = new QMarkerCheck("markerCheck");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final BooleanPath mcCheck = createBoolean("mcCheck");

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public QMarkerCheck(String variable) {
        this(MarkerCheck.class, forVariable(variable), INITS);
    }

    public QMarkerCheck(Path<? extends MarkerCheck> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMarkerCheck(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMarkerCheck(PathMetadata metadata, PathInits inits) {
        this(MarkerCheck.class, metadata, inits);
    }

    public QMarkerCheck(Class<? extends MarkerCheck> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

