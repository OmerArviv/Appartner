import re
import sys
import json
import requests


# Define the patterns to match for the name (with re.IGNORECASE flag)
name_patterns = [re.compile(r"my name is (\w+)", re.IGNORECASE),
                 re.compile(r"i am (\w+)", re.IGNORECASE),
                 re.compile(r"me (\w+)", re.IGNORECASE)]

# Define the pattern to match for the age (with re.IGNORECASE flag)
age_pattern = re.compile(
    r"\b\d{1,2}\b|\b\d{1,2}\s*(?:years?|yrs?)\b", re.IGNORECASE)


# Define the pattern to match for the city
city_pattern = re.compile(
    r"street in\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b", re.IGNORECASE)

pets_pattern = re.compile(
    r"\b(?:pet[- ]*(?:friendly|allowed)|no[- ]*pets)\b", re.IGNORECASE)

smoking_pattern = re.compile(
    r"\b(?:smoking[- ]*(?:free|not allowed|prohibited)|no[- ]*smoking|smoking[- ]*(?:allowed|permitted)|sometimes[- ]*smoking)\b", re.IGNORECASE)

kosher_pattern = re.compile(
    r"\b(?:kosher|non[-\s]*\w*kosher)\b", re.IGNORECASE)

employment_pattern = re.compile(
    r"\b(?:full time job|full-time job|full-time employment|full time employment|full-time work|full time work|full-time job opportunity|full time job opportunity|full-time position|full time position|half time job|half-time job|half-time employment|half time employment|half-time work|half time work|half-time job opportunity|half time job opportunity|half-time position|half time position|student|not working|unemployed)\b", re.IGNORECASE)


alcohol_pattern = re.compile(
    r"\b(?:alcohol[- ]*(?:free|not allowed|prohibited)|no[- ]*alcohol|alcohol[- ]*(?:allowed|permitted)|sometimes[- ]*alcohol)\b", re.IGNORECASE)

gender_pattern = re.compile(r"\b(?:male|female)\b", re.IGNORECASE)


# Input text
# text = "Hello, my name is Omer and I live at 23 Gjordan Street in Tel Aviv.20 years, pet friendly,not smoke free, kosher"

text = sys.argv[1]

# print(text)


# Extract the strings using regular expressions
name = ""
for pattern in name_patterns:
    name_match = pattern.search(text)
    if name_match:
        name = name_match.group(1)
        break  # Stop searching after the first match

age = ""
age_match = age_pattern.search(text)
if age_match:
    age = age_match.group(0)

city_match = city_pattern.search(text)
if city_match:
    city = city_match.group(1)
else:
    city = ""

pets = ""
pets_match = pets_pattern.search(text)
if pets_match:
    pets = "Yes"
else:
    pets = ""

smoking = ""
smoking_match = smoking_pattern.search(text)
if smoking_match:
    smoking_str = smoking_match.group(0).lower()
    if "free" in smoking_str or "prohibited" in smoking_str or "not allowed" in smoking_str:
        smoking = "No"
    elif "allowed" in smoking_str or "permitted" in smoking_str:
        smoking = "Yes"
    elif "sometimes" in smoking_str:
        smoking = "Sometimes"

employment = ""
employment_match = employment_pattern.search(text)
if employment_match:
    employment = employment_match.group(0)

alcohol = ""
alcohol_match = alcohol_pattern.search(text)
if alcohol_match:
    alcohol_str = alcohol_match.group(0).lower()
    if "free" in alcohol_str or "prohibited" in alcohol_str or "not allowed" in alcohol_str:
        alcohol = "No"
    elif "allowed" in alcohol_str or "permitted" in alcohol_str:
        alcohol = "Yes"
    elif "sometimes" in alcohol_str:
        alcohol = "Sometimes"


kosher_match = kosher_pattern.search(text)
if kosher_match:
    kosher_str = kosher_match.group(0).lower()
    if "non" in kosher_str:
        kosher = "No"
    else:
        kosher = "Yes"
else:
    kosher = ""


gender = ""
gender_match = gender_pattern.search(text)
if gender_match:
    gender_str = gender_match.group(0).lower()
    if "female" in gender_str:
        gender = "Female"
    elif "male" in gender_str:
        gender = "Male"
    else:
        gender = "Other"
else:
    gender = ""


userProfile = {
    "name": name,
    "age": age,
    "user_employment": employment,
    "smoking": smoking,
    "pets": pets,
    "alcohol": alcohol,
    "kosher": kosher,
    "gender": gender,
}


json_str = json.dumps(userProfile)

sys.stdout.write(json_str)
sys.stdout.flush()
