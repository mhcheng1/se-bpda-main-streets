from app import db

class Business(db.Model):
    __tablename__ = 'business'
    __table_args__ = {'extend_existing': True}

    object_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    status = db.Column(db.String())

    def __init__(self, object_id, name, status):
        self.object_id = object_id
        self.name = name
        self.status = status

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'object_id': self.object_id, 
            'name': self.name,
            'author': self.status,
        }

class Location(db.Model):
    __tablename__ = 'location'
    __table_args__ = {'extend_existing': True}

    b_id = db.Column(db.Integer, db.ForeignKey('business.object_id'), primary_key=True)
    street = db.Column(db.String(), primary_key=True)
    longitude = db.Column(db.String())
    lattitude = db.Column(db.String())
    postal = db.Column(db.Integer)
    
    def __init__(self, b_id, street, longitude, lattitude, postal):
        self.b_id = b_id
        self.street = street
        self.longitude = longitude
        self.lattitude = lattitude 
        self.postal = postal

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'buisness_id': self.b_id, 
            'street': self.street,
            'longitude': self.longitude,
            'lattitude': self.lattitude,
            'postal': self.postal,
        }

class Online_profile(db.Model):
    __tablename__ = 'online_profile'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id, 
            'name': self.name,
        }

class Busi_online(db.Model):
    __tablename__ = 'busi_online'
    __table_args__ = {'extend_existing': True}

    b_id = db.Column(db.Integer, db.ForeignKey('business.object_id'), primary_key=True)
    op_id = db.Column(db.String(), db.ForeignKey('online_profile.id'), primary_key=True)
    
    def __init__(self, b_id, op_id):
        self.b_id = b_id
        self.op_id = op_id

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'buisness_id': self.b_id, 
            'online_profile_id': self.op_id,
        }

class Busi_online(db.Model):
    __tablename__ = 'busi_online'
    __table_args__ = {'extend_existing': True}

    b_id = db.Column(db.Integer, db.ForeignKey('business.object_id'), primary_key=True)
    op_id = db.Column(db.String(), db.ForeignKey('online_profile.id'), primary_key=True)
    
    def __init__(self, b_id, op_id):
        self.b_id = b_id
        self.op_id = op_id

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'buisness_id': self.b_id, 
            'online_profile_id': self.op_id,
        }

class Industry(db.Model):
    __tablename__ = 'industry'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    NAICS = db.Column(db.Integer)
    F2_2017 = db.Column(db.Integer)
    F2_2017_n = db.Column(db.String())
    F2_digit = db.Column(db.Integer)
    F2_digit_n = db.Column(db.String())

    def __init__(self, id, NAICS, F2_2017, F2_2017_n, F2_digit, F2_digit_n):
        self.id = id
        self.NAICS = NAICS
        self.F2_2017 = F2_2017
        self.F2_2017_n = F2_2017_n
        self.F2_digit = F2_digit
        self.F2_digit_n= F2_digit_n

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id,
            'NAICS': self.NAICS,
            'F2_2017': self.F2_2017,
            'F2_2017_n': self.F2_2017_n,
            'F2_digit': self.F2_digit,
            'F2_digit_n': self.F2_digit_n,
        }

class Busi_industry(db.Model):
    __tablename__ = 'busi_industry'
    __table_args__ = {'extend_existing': True}

    b_id = db.Column(db.Integer, db.ForeignKey('business.object_id'), primary_key=True)
    ind_id = db.Column(db.Integer, db.ForeignKey('industry.id'), primary_key=True)

    def __init__(self, b_id, ind_id):
        self.b_id = b_id
        self.ind_id = ind_id

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'b_id': self.b_id,
            'ind_id': self.ind_id,
        }