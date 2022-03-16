class Database:
    def __init__(self):
        self.data = {}
        
        
    def new_collection(self, name):
        self.data[name] = []
        
        
    def insert_into(self, collection, columns, values):
        new_object = {}
        for column in columns:
            new_object[column] = values[columns.index(column)]
        self.data[collection].append(new_object)
    
    
    def select_from(self, collection, column, value):
        for object in self.data[collection]:
            if object[column] == value:
                return object
        return None
    
    def delete(self, collection, column, value):
        for object in self.data[collection]:
            if object[column] == value:
                self.data[collection].remove(object)
        

    
# db = Database()
# db.new_collection("Users")
# db.insert_into("Users", ("username", "password"), ("Yorch", "1234"))
# db.insert_into("Users", ("username", "password"), ("eo", "5678"))

# print(db.select_from("Users", "username", "eo"))
# db.delete("Users", "username", "eo")
# print(db.select_from("Users", "username", "eo"))
