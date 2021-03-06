# Generated by Django 4.0 on 2021-12-22 10:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('todo', '0002_alter_todo_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='timestamp',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='todo',
            old_name='user',
            new_name='created_by',
        ),
        migrations.RenameField(
            model_name='todo',
            old_name='task',
            new_name='description',
        ),
        migrations.RenameField(
            model_name='todo',
            old_name='updated',
            new_name='updated_at',
        ),
        migrations.AddField(
            model_name='todo',
            name='due_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='todo',
            name='list_order',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='TodoList',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=180)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_by', to='auth.user')),
            ],
        ),
        migrations.AddField(
            model_name='todo',
            name='list',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='todo_list', to='todo.todolist'),
        ),
    ]
