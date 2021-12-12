from app import db

class Business(db.Model):
    __tablename__ = 'business'
    __table_args__ = {'extend_existing': True}

    object_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    employment = db.Column(db.Integer)
    naics_6 = db.Column(db.Integer)
    naics_6_title = db.Column(db.String())
    naics_2 = db.Column(db.Integer)
    naics_2_title= db.Column(db.String())

    def __init__(self, object_id, name, employment, naics_6, naics_6_title, naics_2, naics_2_title):
        self.object_id = object_id
        self.name = name
        self.employment = employment
        self.naics_6 = naics_6
        self.naics_6_title = naics_6_title
        self.naics_2 = naics_2
        self.naics_2_title = naics_2_title

    def __repr__(self):
        return '<id {}>'.format(self.object_id)
    
    def serialize(self):
        return {
            'object_id': self.object_id, 
            'name': self.name,
            'employment': self.employment,
            'naics_6': self.naics_6,
            'naics_6_title': self.naics_6_title,
            'naics_2': self.naics_2,
            'naics_2_title': self.naics_2_title,
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
        return '<id {}>'.format(self.b_id)
    
    def serialize(self):
        return {
            'buisness_id': self.b_id, 
            'street': self.street,
            'longitude': self.longitude,
            'lattitude': self.lattitude,
            'postal': self.postal,
        }

class Mainstreet(db.Model):
    __tablename__ = 'mainstreet'
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

class OnlineProfile(db.Model):
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

class BusiOnline(db.Model):
    __tablename__ = 'busi_online'
    __table_args__ = {'extend_existing': True}

    b_id = db.Column(db.Integer, db.ForeignKey('business.object_id'), primary_key=True)
    op_id = db.Column(db.Integer, db.ForeignKey('online_profile.id'), primary_key=True)
    
    def __init__(self, b_id, op_id):
        self.b_id = b_id
        self.op_id = op_id

    def __repr__(self):
        return '<id {}>'.format(self.b_id)
    
    def serialize(self):
        return {
            'buisness_id': self.b_id, 
            'online_profile_id': self.op_id,
        }

class BusiMain(db.Model):
    __tablename__ = 'busi_to_main'
    __table_args__ = {'extend_existing': True}

    b_id = db.Column(db.Integer, db.ForeignKey('business.object_id'), primary_key=True)
    m_id = db.Column(db.Integer, db.ForeignKey('mainstreet.id'), primary_key=True)
    
    def __init__(self, b_id, m_id):
        self.b_id = b_id
        self.m_id = m_id

    def __repr__(self):
        return '<id {}>'.format(self.b_id)
    
    def serialize(self):
        return {
            'buisness_id': self.b_id, 
            'mainstreet_id': self.m_id,
        }