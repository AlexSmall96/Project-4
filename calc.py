import datetime

def date_to_serial(day, month, year) :
    offset = 693594
    current = datetime.date(year, month, day)
    n = current.toordinal()
    serial = n - offset
    serial_str = str(serial)
    session_id = int("1" + serial_str)
    return (session_id)


print(date_to_serial(23, 4, 2023))

