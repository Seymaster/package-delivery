

class MongoDBRepository {
    constructor(Model) {
        this.Model = Model;
    }

    create(payload) {
        return this.Model.create(payload);
    }

    async findById(id) {
        try {
            return this.Model.findOne({_id: id,
                deletedAt: null});
        } catch (error) {
            return null;
        }
    }

    async findOne(condition, sort = {}, options = {}) {
        try {
            condition.deletedAt = null;

            const query = this.Model.findOne(condition).sort(sort);

            if (options.lean) return query.lean();

            return query;
        } catch (error) {
            return null;
        }
    }

    all(condition, sort = {}, page = null, limit = 100) {
        try{
            condition.deletedAt = null;
            if(page){
                delete condition.page;
                delete condition.limit;
                return this.Model.paginate(condition,{sort, page, limit: parseInt(limit)});
            }else {
                return this.Model.find(condition).sort(sort);
            }
        }catch (e) {
            console.log(e);
            return this.Model.find(condition).sort(sort);
        }
    }

    truncate(condition = {}) {
        if (process.env.NODE_ENV == "development") {
            return this.Model.deleteMany(condition);
        }

        return null;
    }

    deleteMany(condition = {}) {
        return this.Model.deleteMany(condition);
    }

    massInsert(data = []) {
        if (data.length === 0) return [];

        return this.Model.insertMany(data);
    }

    count(condition = {}) {
        condition.deletedAt = null;

        return this.Model.find(condition).countDocuments();
    }
    update(query = {}, newData = {}) {
        query.deletedAt = null;
        delete query.deletedAt;

        return this.Model.updateMany(query, newData);
    }
    upsert(query = {}, newData = {}) {
        query.deletedAt = null;
        delete query.deleteAt
        return this.Model.updateOne(query, newData, {
            upsert: true,
            setDefaultsOnInsert: true,
        });
    }
    getModel() {
        return this.Model;
    }
}

module.exports = MongoDBRepository;
