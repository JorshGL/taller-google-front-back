class Database:
    def __init__(self):
        self.data = {}
        
        
    def new_collection(self, name: str):
        self.data[name] = []
        
        
    def insert_into(self, collection: str, columns: tuple, values: tuple):
        last_id = self.data[collection][-1]['id'] if len(self.data[collection]) > 0 else 0
        new_object = {'id' : last_id+1}
        for column in columns:
            new_object[column] = values[columns.index(column)]
        self.data[collection].append(new_object)
    
    
    def select_from(self, collection: str, column: str, value: str):
        for object in self.data[collection]:
            if object[column] == value:
                return object
        return None
    
    
    def delete(self, collection: str, column: str, value: str):
        for object in self.data[collection]:
            if object[column] == value:
                self.data[collection].remove(object)
        
                
    def commit(self):
        file = open("database.txt", "w")
        file.write(self.data.__str__())
