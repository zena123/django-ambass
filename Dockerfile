FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /django_ambass
COPY requirements.txt /django_ambass/requirements.txt
RUN pip install -r requirements.txt
COPY . /django_ambass

CMD python manage.py wait_for_db && python manage.py runserver 0.0.0.0:8000