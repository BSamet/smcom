import datetime
import random

def generate_line(pkid: int, cnc_handle_gen, state_handle, start_date_gen: datetime.date, end_date_gen: datetime.date):
    a_timedelta = end_date_gen - start_date_gen
    seconds_gen = int(a_timedelta.total_seconds())
    start_date_fmt = start_date_gen.strftime('%m/%d/%Y %H:%M:%S')
    end_date_fmt = end_date_gen.strftime('%m/%d/%Y %H:%M:%S')
    template_line = f'"toppkfield":"{pkid}","topcnchandlefield":"{cnc_handle_gen}","topstatehandlefield":"{state_handle}","topstartdatefield":"{start_date_fmt}","topcommentfield":"","topenddatefield":"{end_date_fmt}","topdurationfield":"{seconds_gen}"'
    return "{" + template_line + "},"


if __name__ == '__main__':
    cnc_handle = input("CNC HANDLE > ")
    start_id = int(input("START ID > "))
    start_date = datetime.datetime(2022, 1, 1, 0, 0, 0)
    limit_date = datetime.datetime(2022, 1, 30, 23, 59, 0)
    print("Script will now generate random tops ranging from state 1 to 5")
    print("Limits:\n", start_date, "->", limit_date)
    gens = 0
    data = ""
    last_state = 0
    while True:
        state = random.randint(0, 4)
        while last_state == state:
            state = random.randint(0, 4)
        last_state = state
        seconds = random.randint(1, 3600)
        end_date = start_date + datetime.timedelta(seconds=seconds)
        data += generate_line(start_id + gens, cnc_handle, state, start_date, end_date) + "\n"
        start_date = end_date
        gens += 1
        if end_date > limit_date:
            break
    print("Generated", gens, "tops")
    with open('generated.txt', 'w') as the_file:
        the_file.write(data)
    print("File saved under generated.txt")
    input()
