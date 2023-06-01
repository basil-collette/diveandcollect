<?php

namespace App\Controller\Admin;

use App\Entity\DivingEvent;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class DivingEventCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return DivingEvent::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
