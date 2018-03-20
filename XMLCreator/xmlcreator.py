import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pprint

def main():
    #gets credentials and stuff for the bot
    scope = ['https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
    client = gspread.authorize(creds)

    #gets the first sheet, which is all the info we need
    #data is a list of dictionaries
    sheet = client.open('TeacherDatabase').sheet1
    data = sheet.get_all_records()
    #open the xml file we will be writing to
    file = open("..\db.txt", "w")
    file.write("<list>\n");

    for row in data:
        file.write("\t<teacherinfo>\n")
        #write the name tags to file
        file.write("\t\t<name>\n")
        file.write("\t\t\t<first>" + row["FirstName"] + "</first>\n")
        file.write("\t\t\t<last>" + row["LastName"] + "</last>\n")
        file.write("\t\t</name>\n")

        #sees if the rooms are all the same; if so, the teacher is not moving
        movingBool = isMoving(row)
        movingString = str(movingBool).lower()
        file.write("\t\t<moving>" + movingString + "</moving>\n")

        file.write("\t\t<room>")
        if movingBool:
            file.write("\n")
            for i in range(1,9):
                column = "Period" + str(i)
                tag = "p" + str(i)
                roomNumber = str(row[column])
                file.write("\t\t\t<" + tag + ">" + roomNumber + "</" + tag + ">\n")
            file.write("\t\t")
        else:
            file.write(str(row["Period1"]))
            
        file.write("</room>\n")
        file.write("\t</teacherinfo>\n")

    file.write("</list>")

#determines if the teacher is a moving teacher or not
def isMoving(row):
    for i in range(2, len(row) - 2):
        per1 = "Period" + str(i)
        per2 = "Period" + str(i + 1)
        if(row[per1] != row[per2]):
            return True
    return False


main()
