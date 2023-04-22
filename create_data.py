data = [
 {
   "pk": 145039,
   "model": "classbooking_app.session",
   "name": "Boxfit",
   "date": "2023-04-23",
   "time": "10:00",
   "spaces": 25,
   "location": "Studio A",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 245039,
   "model": "classbooking_app.session",
   "name": "Kettlebells",
   "date": "2023-04-23",
   "time": "11:00",
   "spaces": 20,
   "location": "Studio B",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 345039,
   "model": "classbooking_app.session",
   "name": "Yoga",
   "date": "2023-04-23",
   "time": "12:00",
   "spaces": 15,
   "location": "Studio C",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 145040,
   "model": "classbooking_app.session",
   "name": "Boxfit",
   "date": "2023-04-24",
   "time": "11:00",
   "spaces": 25,
   "location": "Studio A",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 245040,
   "model": "classbooking_app.session",
   "name": "Kettlebells",
   "date": "2023-04-24",
   "time": "12:00",
   "spaces": 20,
   "location": "Studio B",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 345040,
   "model": "classbooking_app.session",
   "name": "Yoga",
   "date": "2023-04-24",
   "time": "14:00",
   "spaces": 15,
   "location": "Studio C",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 145041,
   "model": "classbooking_app.session",
   "name": "Boxfit",
   "date": "2023-04-25",
   "time": "10:00",
   "spaces": 25,
   "location": "Studio A",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 245041,
   "model": "classbooking_app.session",
   "name": "Kettlebells",
   "date": "2023-04-25",
   "time": "11:00",
   "spaces": 20,
   "location": "Studio B",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 345041,
   "model": "classbooking_app.session",
   "name": "Yoga",
   "date": "2023-04-25",
   "time": "12:00",
   "spaces": 15,
   "location": "Studio C",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 145042,
   "model": "classbooking_app.session",
   "name": "Boxfit",
   "date": "2023-04-26",
   "time": "11:00",
   "spaces": 25,
   "location": "Studio A",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 245042,
   "model": "classbooking_app.session",
   "name": "Kettlebells",
   "date": "2023-04-26",
   "time": "12:00",
   "spaces": 20,
   "location": "Studio B",
   "running": 1,
   "attendees": ""
 },
 {
   "pk": 345042,
   "model": "classbooking_app.session",
   "name": "Yoga",
   "date": "2023-04-26",
   "time": "14:00",
   "spaces": 15,
   "location": "Studio C",
   "running": 1,
   "attendees": ""
 }
]


def create_data(data):
    new_data = []
    for dict in data:
        new_dict = {}
        new_dict["fields"] = {}
        for key in dict:
            if key == "pk" or key == "model":
                new_dict[key] = dict[key]
            elif key == "running":
                new_dict["fields"][key] = True
            else:
                new_dict["fields"][key] = dict[key]
        new_data.append(new_dict)
    return new_data
    
            

print(create_data(data))


            
