package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReport is a Querydsl query type for Report
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReport extends EntityPathBase<Report> {

    private static final long serialVersionUID = -2053650409L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReport report = new QReport("report");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    public final BooleanPath approvalCheck = createBoolean("approvalCheck");

    public final StringPath category = createString("category");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final QDeal deal;

    public final QMember fromMember;

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final QMember toMember;

    public QReport(String variable) {
        this(Report.class, forVariable(variable), INITS);
    }

    public QReport(Path<? extends Report> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReport(PathMetadata metadata, PathInits inits) {
        this(Report.class, metadata, inits);
    }

    public QReport(Class<? extends Report> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.deal = inits.isInitialized("deal") ? new QDeal(forProperty("deal"), inits.get("deal")) : null;
        this.fromMember = inits.isInitialized("fromMember") ? new QMember(forProperty("fromMember")) : null;
        this.toMember = inits.isInitialized("toMember") ? new QMember(forProperty("toMember")) : null;
    }

}

